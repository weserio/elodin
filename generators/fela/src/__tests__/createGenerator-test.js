import { parse } from '@elodin/core'

import createGenerator from '../createGenerator'

const style = `
variant Mode {
  Dark
  Light
}

view Button {
  paddingLeft: 10

  [@viewportWidth>=1024] {
    paddingLeft: 20
  }

  [Mode=Dark] {
    paddingTop: 10
  }
}

text ButtonText {
  color: red
}
`

describe('Generating files using @elodin/generator-css', () => {
  it('should generate css and js files', () => {
    const ast = parse(style).ast

    expect(createGenerator()(ast, 'style.elo')).toMatchSnapshot()
  })

  it('should generate readable classnames in devMode', () => {
    const ast = parse(style).ast

    expect(
      createGenerator({ devMode: true })(ast, 'style.elo')
    ).toMatchSnapshot()
  })

  it('should use a custom style name', () => {
    const ast = parse(style).ast

    expect(
      createGenerator({ generateStyleName: styleName => styleName + 'Style' })(
        ast,
        'style.elo'
      )
    ).toMatchSnapshot()
  })

  it('should use custom css file names', () => {
    const ast = parse(style).ast

    expect(
      createGenerator({
        generateCSSFileName: moduleName => moduleName.toUpperCase() + '.elo',
      })(ast, 'style.elo')
    ).toMatchSnapshot()
  })

  it('should use custom js file names', () => {
    const ast = parse(style).ast

    expect(
      createGenerator({
        generateJSFileName: moduleName => moduleName.toUpperCase() + '.elo',
      })(ast, 'style.elo')
    ).toMatchSnapshot()
  })

  it('should use dynamic imports', () => {
    const ast = parse(style).ast

    expect(
      createGenerator({ dynamicImport: true })(ast, 'style.elo')
    ).toMatchSnapshot()
  })

  it('should add reset class names', () => {
    const ast = parse(style).ast

    expect(
      createGenerator({ viewBaseClassName: 'view', textBaseClassName: 'text' })(
        ast,
        'style.elo'
      )
    ).toMatchSnapshot()
  })

  it('should work with all options combined', () => {
    const ast = parse(style).ast

    expect(
      createGenerator({
        devMode: true,
        dynamicImport: true,
        viewBaseClassName: 'view',
        textBaseClassName: 'text',
        generateJSFileName: name => name.toUpperCase() + '.elo',
        generateCSSFileName: name => name.toUpperCase() + '.elo',
        generateStyleFileName: name => name + 'Style',
      })(ast, 'style.elo')
    ).toMatchSnapshot()
  })
})
