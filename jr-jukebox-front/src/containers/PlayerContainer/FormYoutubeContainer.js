import 'react-flags-select/css/react-flags-select.css';

import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ReactFlagsSelect from 'react-flags-select';
import { Col, Grid, Row } from 'react-flexbox-grid';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Swal from 'sweetalert2';

import * as actions from '../../actions';
import { TAGS, URL_API } from '../../constants';
import { getFormValue, getOptions, getSelectedVideo } from '../../reducers';

class FormYoutubeContainer extends Component {
  constructor(props) {
    super(props);
    props.setOptions(TAGS);
    this.refreshForm(props.selectedVideo);
  }

  handleSelectedOption = optionType => this.props.addOption(optionType);

  handleUnselectedOption = optionType => this.props.removeOption(optionType);

  checkInfo = () => {
    const { formValue } = this.props;
    if (!formValue.youtubeid || formValue.youtubeid === "") {
      this.refs.youtubeid.style.backgroundColor = "orange";
      return false;
    }
    if (!formValue.title || formValue.title === "") {
      this.refs.title.style.backgroundColor = "orange";
      return false;
    }
    if (!formValue.author || formValue.author === "") {
      this.refs.author.style.backgroundColor = "orange";
      return false;
    }
    if (!formValue.language || formValue.language === "") {
      this.refs.language.style.backgroundColor = "orange";
      return false;
    }
    if (!formValue.year || formValue.year === "") {
      this.refs.year.style.backgroundColor = "orange";
    } else {
      try {
        let year = +formValue.year;
        if (year < 1950 || year > 2039) {
          throw new Error("");
        }
      } catch (er) {
        this.refs.year.style.backgroundColor = "orange";
        return false;
      }
    }

    if (
      !formValue.tags ||
      formValue.tags === "" ||
      formValue.tags.length === 0
    ) {
      this.refs.tags.style.backgroundColor = "orange";
      return false;
    }
    this.sendInfo();
  };

  sendInfo = () => {
    this.refs.formButton.disabled = true;
    const { formValue } = this.props;
    const url = `${URL_API}songs/`;
    fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formValue)
    }).then(data => {
      data.json(data).then(data2 => {
        switch (data2.code) {
          case 500:
            Swal.fire({
              title: "Error!",
              text: "Error al guardar la lista.",
              icon: "error",
              confirmButtonText: "Cool"
            });

          default:
            Swal.fire({
              icon: "success",
              title: "Lista grardada correctamente",
              showConfirmButton: false,
              timer: 1500
            });
        }
      });
    });
  };

  refreshForm(selectedVideo) {
    const { setFormValue } = this.props;
    setFormValue({ field: "title", value: selectedVideo.title });
    setFormValue({ field: "youtubeid", value: selectedVideo.id.videoId });
    setFormValue({ field: "year", value: "" });
    setFormValue({
      field: "language",
      value: ""
    });
    if (this.refs.userFlag) {
      this.refs.userFlag.setState({
        selected: undefined
      });
    }
    setFormValue({
      field: "tags",
      value: "[]"
    });
    this.handleChangeMultiple({ target: { value: [] } });
  }

  componentWillReceiveProps(newProps) {
    if (this.props.selectedVideo !== newProps.selectedVideo) {
      this.refreshForm(newProps.selectedVideo);
    }
  }

  handleSelectedOption = optionType => this.props.addOption(optionType);

  handleUnselectedOption = optionType => this.props.removeOption(optionType);

  handleChange = name => event => {
    const { setFormValue } = this.props;
    if (event && event.target) {
      setFormValue({ field: name, value: event.target.value });
      this.refs[name].style.backgroundColor = "";
    }
  };

  handleSelect = name => event => {
    const { setFormValue } = this.props;
    setFormValue({ field: name, value: event });
    this.refs[name].style.backgroundColor = "";
  };

  handleNewTag = name => event => {
    const { newTag, addOption, formValue, setFormValue } = this.props;
    const value = this.refs.newTag.childNodes[0].value;
    if (value && value !== "") {
      newTag(value);
      this.refs.newTag.childNodes[0].value = "";
      addOption(TAGS)(value);
      let values = formValue.tags;
      values.push(value);
      setFormValue({
        field: "tags",
        value: values
      });
      this.refs.tags.style.backgroundColor = "";
    }
  };

  handleChangeMultiple = event => {
    const { value } = event.target;
    const {
      optionListTags,
      addOption,
      removeOption,
      setFormValue
    } = this.props;
    let values = [];
    for (let i = 0; i < optionListTags.length; i++) {
      if (value.indexOf(optionListTags[i].name) > -1) {
        addOption(TAGS)(optionListTags[i].name);
        values.push(optionListTags[i].name);
        this.refs.tags.style.backgroundColor = "";
      } else {
        removeOption(TAGS)(optionListTags[i].name);
      }
    }
    setFormValue({
      field: "tags",
      value: values
    });
  };

  render() {
    const { formValue, optionListTags } = this.props;
    return (
      <Grid>
        <Row bottom="xs">
          <Col xs={12}>
            <Row>
              <FormControl
                variant="outlined"
                className="formBox"
                ref="youtubeid"
              >
                <InputLabel
                  htmlFor="component-id"
                  className="MuiInputLabel-outlined MuiInputLabel-shrink"
                >
                  Youtube ID
                </InputLabel>
                <Input
                  id="component-id"
                  value={formValue.youtubeid}
                  onChange={this.handleChange("youtubeid")}
                />
              </FormControl>
            </Row>
            <Row>
              <FormControl variant="outlined" className="formBox" ref="title">
                <InputLabel
                  htmlFor="component-title"
                  className="MuiInputLabel-outlined MuiInputLabel-shrink"
                >
                  Título
                </InputLabel>
                <Input
                  id="component-title"
                  value={formValue.title}
                  onChange={this.handleChange("title")}
                />
              </FormControl>
            </Row>
            <Row>
              <FormControl variant="outlined" className="formBox" ref="author">
                <InputLabel
                  htmlFor="component-Autor"
                  className="MuiInputLabel-outlined MuiInputLabel-shrink"
                >
                  Autor
                </InputLabel>
                <Input
                  id="component-Autor"
                  value={formValue.author}
                  onChange={this.handleChange("author")}
                />
              </FormControl>
            </Row>
            <Row>
              <FormControl
                variant="outlined"
                className="formBox"
                ref="language"
              >
                <InputLabel
                  htmlFor="component-language"
                  className="MuiInputLabel-outlined MuiInputLabel-shrink"
                >
                  Idioma
                </InputLabel>
                <br />
                <ReactFlagsSelect
                  id="component-language"
                  ref="userFlag"
                  searchable={true}
                  defaultCountry={formValue.language}
                  searchPlaceholder="Selecciona país"
                  onSelect={this.handleSelect("language")}
                />
              </FormControl>
            </Row>
            <Row>
              <FormControl variant="outlined" className="formBox" ref="year">
                <InputLabel
                  htmlFor="component-year"
                  className="MuiInputLabel-outlined MuiInputLabel-shrink"
                >
                  Año
                </InputLabel>
                <Input
                  id="component-year"
                  value={formValue.year}
                  onChange={this.handleChange("year")}
                />
              </FormControl>
            </Row>
            <Row>
              <FormControl className="formBox" ref="tags">
                <InputLabel
                  htmlFor="mutiple-chip"
                  id="mutiple-chip-label"
                  className="MuiInputLabel-outlined MuiInputLabel-shrink labelToRight"
                >
                  Etiquetas
                </InputLabel>
                <Select
                  labelId="mutiple-chip-label"
                  id="mutiple-chip"
                  onChange={this.handleChangeMultiple}
                  input={<Input id="select-multiple-chip" />}
                  multiple
                  value={optionListTags.map(value => {
                    if (value.selected) {
                      return value.name;
                    }
                    return null;
                  })}
                  renderValue={selected => {
                    return (
                      <div className="chipsSelect">
                        {selected.map(value => {
                          if (value) {
                            return (
                              <Chip
                                key={value}
                                label={value}
                                className="chipsSelectI"
                              />
                            );
                          }
                          return null;
                        })}
                      </div>
                    );
                  }}
                >
                  {optionListTags.map(tag => (
                    <MenuItem
                      key={tag.name}
                      value={tag.name}
                      //style={getStyles(name, personName, theme)}
                    >
                      {tag.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Chip
                label="+"
                className="chipsSelectI"
                onClick={this.handleNewTag()}
                clickable={true}
              />
              <Input ref="newTag" />
            </Row>
          </Col>
        </Row>
        <Row>
          <Button
            ref="formButton"
            className="formBox"
            variant="contained"
            color="primary"
            onClick={() => {
              this.checkInfo();
            }}
          >
            Añadir a JukeBox
          </Button>
        </Row>
      </Grid>
    );
  }
}

FormYoutubeContainer.propTypes = {
  formValue: PropTypes.object.isRequired,
  selectedVideo: PropTypes.object,
  optionListTags: PropTypes.array.isRequired,
  getOptions: PropTypes.func.isRequired,
  stateGlobal: PropTypes.object.isRequired,
  newTag: PropTypes.string
};

function mapStateToProps(state) {
  return {
    formValue: getFormValue(state),
    selectedVideo: getSelectedVideo(state) || { id: {}, snippet: {} },
    optionListTags: getOptions(state)(TAGS) || [],
    getOptions: getOptions,
    stateGlobal: state,
    newTag: ""
  };
}

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FormYoutubeContainer);
