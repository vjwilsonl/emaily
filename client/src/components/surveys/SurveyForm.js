// SurveyForm shows a form for a suer to add input
import _ from 'lodash';
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import SurveyField from './SurveyField';
import validateEmails from '../../utils/validateEmail';
import formFields from './formFields';

class SurveyForm extends Component {
  renderFields() {
    return _.map(formFields, ({ label, name }) => {
      return (
        <Field
          key={name}
          component={SurveyField}
          type="text"
          label={label}
          name={name}
        />
      );
    });
  }
  // return (
  //   <div>
  //     <Field
  //       label="Survey Title"
  //       type="text"
  //       name="title"
  //       component={SurveyField}
  //     />
  //     <Field
  //       label="Subject Line"
  //       type="text"
  //       name="subject"
  //       component={SurveyField}
  //     />
  //     <Field
  //       label="Email Body"
  //       type="text"
  //       name="body"
  //       component={SurveyField}
  //     />
  //     <Field
  //       label="Recipient List"
  //       type="text"
  //       name="emails"
  //       component={SurveyField}
  //     />
  //   </div>
  // );
  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
          {this.renderFields()}
          <Link to="/surveys" className="red btn-flat white-text">
            Cancel
          </Link>
          <button type="submit" className="teal btn-flat right white-text">
            Next
            <i className="material-icons right">done</i>
          </button>
        </form>
      </div>
    );
  }
}

function validate(values) {
  const errors = {}; // if empty reduxform assume no error

  errors.recipients = validateEmails(values.recipients || '');
  // the error will be linked to the same attribute Name in the form
  _.each(formFields, ({ name }) => {
    if (!values[name]) {
      errors[name] = 'You must provide a value';
    }
  });

  return errors;
}

export default reduxForm({
  validate: validate, // performed everytime form is submitted
  form: 'surveyForm',
  destroyOnUnmount: false
})(SurveyForm);
//reduxform helper bring in this.props.handleSubmit
