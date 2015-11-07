Layout = class extends React.Component {
  render() {
    return this.props.content;
  }
}

const model = new TodosModel();
ReactLayout.render(Layout, {
  content:<TodoApp model={model}/>
});