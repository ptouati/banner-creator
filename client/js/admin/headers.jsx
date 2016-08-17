import React from 'react';
import ReactDOM from 'react-dom';
import {h} from 'bazooka';
import {activatePopUp} from '../popUp.js';

const BAZOOKA_PREFIX = 'projects';

const HEADERS_TEXTS = {
    header1: 'H1 подзаголовок',
    header2: 'H2 подзаголовок',
    header3: 'H3 подзаголовок',
    price1: 'Цена от для большого банера',
    price2: 'Цена от для маленького банера'
};

const HEADERS_ORDER = ['header1', 'header2', 'header3', 'price1', 'price2'];

const FontSelect = (props) => (
    <div className="col-md-2">
        <select className="form-control" onChange={props.changeSelected} defaultValue={props.font || ""}>
            <option disabled value="">Не выбрано</option>
            {
                props.fontList.map((font) => (
                        <option value={font}>{font}</option>
                    )
                )
            }
        </select>
    </div>
);

const SizeSelect = (props) => (
    <div className="col-md-1">
        <input className="form-control" type="number" min="5" onChange={props.changeSize}/>
    </div>
);

const HeaderShower = (props) => {
    let headerStyle = {};
    if (props.font) {
        headerStyle['font-family'] = props.font;
    }
    if (props.size) {
        headerStyle['font-size'] = props.size;
    }
    return (<div className="col-md-3" style={headerStyle}>{HEADERS_TEXTS[props.name]}</div>)
};

class HeadersPanel extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            fontList: this.props.fontList,
            headers: this.props.headers,

        };

        this.configChangeSelectedFont = this.configChangeSelectedFont.bind(this);
        this.configChangeSize = this.configChangeSize.bind(this);
        this.save = this.save.bind(this);
    }

    configChangeSelectedFont(name) {
        return (e) => {
            let {fontList, headers} = this.state;
            if (!headers[name]) {
                headers[name] = {}
            }
            headers[name].font = fontList[e.target.selectedIndex - 1];
            this.setState({
                headers: headers
            });
        }
    }

    configChangeSize(name) {
        return (e) => {
            let {headers} = this.state;
            if (!headers[name]) {
                headers[name] = {}
            }
            headers[name].size = e.target.value;
            this.setState({
                headers: headers
            });
        }
    }

    save() {
        const {headers} = this.state;
        if (Object.keys(headers).length < HEADERS_ORDER.length){
            activatePopUp({
                    title: 'Шрифт и размер должны быть проставлены для всех пунктов',
                    flash: true,
                });
            return
        }
        fetch(`/admin/projects/${this.state.project_id}/headers/`, {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'X-CSRFToken': csrfToken()
            },
            body: JSON.stringify(this.state.headers)
        })
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                location.reload();
            })
            .catch((response) => {
                console.error(response.message);
                activatePopUp({
                    title: 'Ошибка сервера',
                    flash: true,
                });
            });
    }

    render() {
        const {fontList, headers} = this.state;
        return (
            <div className="container">
                {
                    HEADERS_ORDER.map((name) => (
                            <Header
                                fontList={fontList}
                                name={name}
                                font={(headers[name] || {font: ""}).font}
                                size={(headers[name] || {}).size}
                                changeFont={this.configChangeSelectedFont(name)}
                                changeSize={this.configChangeSize(name)}
                            />
                        )
                    )
                }
                <div className='form-group'>
                    <button type="submit" className='btn btn-success' onClick={this.save}>Сохранить</button>
                </div>
            </div>
        );
    }
}

class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {fontList, name, font, size} = this.props;
        return (
            <div className="row disperse">
                <div className="col-md-3">{HEADERS_TEXTS[name]}</div>
                <FontSelect
                    fontList={fontList}
                    font={font}
                    changeSelected={this.props.changeFont}
                />
                <SizeSelect
                    font={font}
                    changeSize={this.props.changeSize}
                />
                <HeaderShower
                    font={font}
                    size={size}
                    name={name}
                />
            </div>
        );
    }
}


export default function (node) {
    let {fontList, headers, project_id} = h.getAttrs(BAZOOKA_PREFIX, node);

    ReactDOM.render(
        <HeadersPanel
            fontList={fontList}
            headers={headers}
            project_id={project_id}
        />,
        node
    );
}
