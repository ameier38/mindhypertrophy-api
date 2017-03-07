For some articles that contain math and code I wanted to be able to render $\KaTeX$ within Markdown. I write each article using Markdown because it makes it easier to read and write than doing so in plain HTML. In this post I will show you how I used [markdown-it](https://github.com/markdown-it/markdown-it), [markdown-it-katex](https://github.com/waylonflinn/markdown-it-katex), and leveraged [react-remarkable](https://github.com/acdlite/react-remarkable) to create a React component that renders Markdown and $\KaTeX$.

### Packages
Install the following packages:
```
npm install --save markdown-it
npm install --save markdown-it-katex
npm install --save highlight.js
```
I also had to include `json-loader` because I am using webpack.

### index.html
Include the following CSS links in the index.html file
```html
<!-- index.html -->
<head>
    ...
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.5.1/katex.min.css">
    <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.3.0/styles/default.min.css">
</head>
```

### Markdown.jsx
I created a Markdown JSX component based off of [react-remarkable](https://github.com/acdlite/react-remarkable) which uses the `MarkdownIt.render()` function with the markdown-it-katex plugin to render the Markdown and $\KaTeX$. The code can be found [here](https://github.com/ameier38/mindhypertrophy/blob/master/src/js/Markdown.jsx)

I can then import the component and use it such as in the following:
```jsx
//App.jsx
...
import {Markdown} from './Markdown.jsx'

class Example extends Component{
    constructor(props) {
        super(props)
    }
    render(){
        return(
            <Markdown options={markdownOptions}>
                {this.props.content}
            </Markdown>
        )
    }
}
```
In the above `Example` component, I would pass a string of Markdown to the `content` prop that will look something like this:
```md
### Result

This post was rendered using the above technique. See, I can render some $\KaTeX$ equations like this $f(x) = \int_{-\infty}^\infty\hat f(\xi)\,e^{2 \pi i \xi x}\,d\xi$ directly in line.

I can also create block equations like this:
$$
\frac{v}{v_{max}} = 1- \frac{\rho^2}{\rho_{max}^2}.
$$

I can also render code blocks and other Markdown
\``` js
var foo = function (bar) {
  return bar++;
};

console.log(foo(5));
\```
```

### Result

This post was rendered using the above technique. See, I can render some $\KaTeX$ equations like this $f(x) = \int_{-\infty}^\infty\hat f(\xi)\,e^{2 \pi i \xi x}\,d\xi$ directly in line.

I can also create block equations like this:
$$
\frac{v}{v_{max}} = 1- \frac{\rho^2}{\rho_{max}^2}.
$$

I can also render code blocks and other Markdown
``` js
var foo = function (bar) {
  return bar++;
};

console.log(foo(5));
```