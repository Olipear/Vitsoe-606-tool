import * as React from 'react'

export interface InputProps {
  id: string
  name: string
  label: string
  type: string
  actionProp: Function
  placeholder?: string
  value?: number
}

export class InputText extends React.Component<InputProps> {
  handleChangeDimensions = (e) => {
    this.props.actionProp(e.target.name, e.target.value)
  }

  static defaultProps = {
    placeholder: '',
    value: '',
  }

  render() {
    return (
      <div>
        <label htmlFor={this.props.id}>{this.props.label}</label>
        <input
          type={this.props.type}
          name={this.props.name}
          id={this.props.id}
          placeholder={this.props.placeholder}
          onChange={this.handleChangeDimensions}
          value={this.props.value > 0 ? this.props.value : ''}
        />
      </div>
    )
  }
}
