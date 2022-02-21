const jsonfile = require('jsonfile');
const {
  Document,
  Packer,
  Paragraph,
  TextRun,
  AlignmentType,
  HeadingLevel,
  LevelFormat
} = require('docx');
const fs = require('fs');
const { join } = require('path');
const topic = jsonfile.readFileSync(join(__dirname,"./topic.json"))
const doc = new Document({
  creator: "辣条协会会长",
  title: "题目",
  // description: "A brief example of using docx",
  styles: {
    paragraphStyles: [
      {
        id: "Heading1",
        name: "Heading 1",
        basedOn: "Normal",
        next: "Normal",
        quickFormat: true,
        run: {
          size: 28,
          bold: true,
          // italics: true,
          color: "f39c12",
          font: "黑体"
        },
        paragraph: {
          spacing: {
            after: 120,
          },
        },
      }, {
        id: "questions",
        name: "questions",
        basedOn: "Normal",
        quickFormat: true,
        paragraph: {
          // indent: { left: 400 }
        },
        run: {
          size: 24,
          font: "黑体"
        }
      }, {
        id: "options",
        name: "options",
        basedOn: "Normal",
        quickFormat: true,
        paragraph: {
          indent: { left: 450 }
        },
        run: {
          size: 23
        }
      }, {
        id: "answer",
        name: "answer",
        basedOn: "Normal",
        quickFormat: true,
        paragraph: {
          spacing: {
            after: 100
          }
        },
        run: {
          size: 23
        }
      }
    ],
  },
  numbering: {
    config: [
      {
        reference: "title",
        levels: [
          {
            level: 0,
            format: LevelFormat.DECIMAL,
            text: "%1.",
            alignment: AlignmentType.LEFT,
          }
        ],
      },
    ],
  },
  sections: [{
    children: [
      ...(() => {
        const data = []
        for (const key in topic) {
          if (Object.hasOwnProperty.call(topic, key) && key != 'questions') {
            /**@type array */
            const block = topic[key];
            data.push(new Paragraph({
              text: key,
              heading: HeadingLevel.HEADING_1,
            }))
            block.forEach((value, index) => {
              value.question
              if (value.option) {
                data.push(
                  new Paragraph({
                    text: value.question,
                    numbering: {
                      reference: "title",
                      level: 0,
                    },
                    style: "questions",
                    spacing: {
                      before: index == 1 ? 120 : undefined
                    }
                  }),
                  ...value.option.map(e => new Paragraph({
                    text: e,
                    style: "options"
                  })),
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: "答案：",
                        bold: true
                      }),
                      new TextRun({
                        text: value.answer
                      }),
                    ],
                    style: "answer"
                  }),
                )
              } else {
                data.push(
                  new Paragraph({
                    text: value.question,
                    numbering: {
                      reference: "title",
                      level: 0,
                    },
                    style: "questions",
                    spacing: {
                      before: index == 0 ? 120 : undefined
                    }
                  }),
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: "答案：",
                        bold: true
                      }),
                      new TextRun({
                        text: value.answer
                      }),
                    ],
                    style: "answer"
                  }),
                )
              }
            })
          }
        }
        return data
      })()
    ],
  }],
});

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync(join(__dirname,'./test.docx'), buffer)
})