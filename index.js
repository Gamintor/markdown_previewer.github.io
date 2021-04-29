
marked.setOptions({
    breaks: true
  });
  
  
let renderer = new marked.Renderer();
renderer.link = function(href, title, text) {
  return `<a target="_blank" href="${href}">${text}` + `</a>`;
}
  
  class App extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        markdown: placeholder,
        editorMaxed: false,
        prevMaxed: false
      }
      this.handleChange = this.handleChange.bind(this);
      this.handleEditorSize = this.handleEditorSize.bind(this);
      this.handlePrevSize = this.handlePrevSize.bind(this);
    }
    
    handleChange(event) {
      this.setState({
        markdown: event.target.value
      })
    }
    
    handleEditorSize() {
      this.setState({
        editorMaxed: !this.state.editorMaxed
      })
    }
    
    handlePrevSize() {
      this.setState({
        prevMaxed: !this.state.prevMaxed
      })
    }
    
    render() {
      let classes = this.state.editorMaxed 
                    ? ['editorStyle maximized', 'previewStyle hide', 'fas fa-compress']
                    : this.state.prevMaxed
                      ? ['editorStyle hide', 'previewStyle maximized', 'fas fa-compress']
                      : ['editorStyle', 'previewStyle', 'fas fa-expand'];
      
      return(
        <div>
          <div className={classes[0]}>
            <Toolbar
              icon={classes[2]}
              onClick={this.handleEditorSize}
              text='Editor' />
            <Editor markdown={this.state.markdown} onChange={this.handleChange} />
          </div>
          <div className={classes[1]}>
            <Toolbar
              icon={classes[2]}
              onClick={this.handlePrevSize}
              text='Previewer'
            />
            <Preview markdown={this.state.markdown} />
          </div>
        </div>
      )
    }
  }
  
  const Toolbar = props => {
    return(
      <div className='toolbar'>
        {props.text}
        <i className={props.icon} onClick={props.onClick} />
      </div>
    );
  }
  
  const Editor = props => {
    return(
      <textarea
        value={props.markdown}
        onChange={props.onChange}
        id='editor'
      />
    );
  }
  
  const Preview = props => {
    return(
      <div 
        id='preview'
        dangerouslySetInnerHTML={{
          __html: marked(props.markdown, {renderer: renderer}) 
        }}
      />
    );
  }
  
  const placeholder = `# This is my markdown previewer
  
  ## I used React to build it
  ### It is my first project built with React
  
  You can write markdown inside this editor and it will be transformed into html and displayed 
  inside of preview!
  
  You can add inline code like this \`new Object\(\)\`
  
  Or you want to add a whole block?!
  
  \`\`\`
  let name = 'Gabriel'
  
  function writeName(arg) {
    return console.log(arg);
  }
  
  writeName(name); // 'Gabriel'
  \`\`\`
  
  Lists can also be added
  
  1. Numbered lists 
  1. Just using ones
  1. And it's sorting it out
  
  Would you like some **bolded text**?!
  
  > Block quotes are also possible!
  
  Of course, images can get added too
  
  ![JS Symbol](https://pdfknjige.net/uploads/javascript.png) 
  
  [Links](https://codepen.io/Gamintor) as well!
  `;

 
  
  ReactDOM.render(<App />, document.getElementById('app'));