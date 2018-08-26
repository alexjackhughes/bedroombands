import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { reduxForm, Field } from "redux-form";

import MyDetails from "./MyDetails";
import SelectInput from "./SelectInput.js";

class Account extends Component {
  renderComponent() {
    switch (this.props.auth) {
      case null:
        return;

      case false:
        return <Redirect to="/" />;

      default:
        return (
          <div>
            <h1>My Account</h1>
            <MyDetails user={this.props.auth} />
            <Field name="countries" component={SelectInput} multi />
          </div>
        );
    }
  }

  render() {
    return (
      <div>
        <h1>My Account</h1>
        {/* <MyDetails user={this.props.auth} /> */}
        <form>
          <Field
            name="countries"
            options={
              ({ label: "Germany", value: "DE" },
              { label: "Russian Federation", value: "RU" },
              { label: "United States", value: "US" })
            }
            component={SelectInput}
            multi
          />
          <button type="submit" className="teal btn-flat right white-text">
            Next<i className="material-icons right">done</i>
          </button>
        </form>
      </div>
    );
    // return <div>{this.renderComponent()}</div>;
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default reduxForm({
  form: "surveyForm",
  destroyOnUnmount: false
})(Account);

// export default connect(mapStateToProps)(Account);
