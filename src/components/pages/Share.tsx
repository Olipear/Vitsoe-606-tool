import * as React from 'react'
import { api } from '../../utils/api'

interface ShareProps {
  match: {
    params: {
      id: string
    }
  }
}

export class Share extends React.Component<ShareProps> {
  render() {
    const id: string = this.props.match.params.id
    const currentId: string = localStorage.getItem('systemId')
    const path = window.location.href.replace(window.location.hash, '')

    if (id == currentId) {
      window.location.replace(path + '#/configurator/parts')
    }

    if (!currentId) {
      api
        .get('/systems/' + id)
        .then((response) => {
          api
            .post('/systems', { object: response.data.object })
            .then((response) => {
              localStorage.setItem(
                'system',
                JSON.stringify(response.data.object)
              )
              localStorage.setItem('systemId', response.data.uuid)

              window.location.replace(path + '#/configurator/parts')
            })
        })
        .catch(() => {
          window.location.replace(path + '#/')
        })
    } else {
      api.get('/systems/' + id).then((response) => {
        localStorage.setItem('system', JSON.stringify(response.data.object))
        window.location.replace(path + '#/configurator/parts')
      })
    }

    return <div />
  }
}
