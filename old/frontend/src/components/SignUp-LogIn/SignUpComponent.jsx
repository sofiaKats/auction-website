import React, { Component } from 'react';

class SignUpComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                 
        }
    }
    
    // sign up form implemented here
    render() {
        return (
            <div className="Auth-form-container">
            <form className="Auth-form">
              <div className="Auth-form-content">
                <h3 className="Auth-form-title">Sign Up</h3>
                <div className="form-group mt-3">
                  <label>Username</label>
                  <input type="text" className="form-control mt-1" placeholder="Username" required />
                </div>
                <div className="form-group mt-3">
                  <label>Password</label>
                  <input type="password" className="form-control mt-1" placeholder="Password" required/>
                </div>
                <div className="form-group mt-3">
                  <label>Verify Password</label>
                  <input type="password" className="form-control mt-1" placeholder="Verify Password" required/>
                </div>
                <div className="form-group mt-3">
                  <label>First Name</label>
                  <input type="text" className="form-control mt-1" placeholder="First Name" required />
                </div>
                <div className="form-group mt-3">
                  <label>Last Name</label>
                  <input type="text" className="form-control mt-1" placeholder="Last Name" required />
                </div>
                <div className="form-group mt-3">
                  <label>Email</label>
                  <input type="email" className="form-control mt-1" placeholder="Email" required />
                </div>
                <div className="form-group mt-3">
                  <label>Phone</label>
                  <input type="number" className="form-control mt-1" placeholder="Phone" required />
                </div>
                <div className="form-group mt-3">
                  <label>Address</label>
                  <input type="text" className="form-control mt-1" placeholder="Address" required />
                </div>
                <div className="form-group mt-3">
                  <label>Geographical Location</label>
                  <input type="text" className="form-control mt-1" placeholder="Geographical Location" required />
                </div>
                <div className="form-group mt-3">
                  <label>Tax Identification Number (Α.Φ.Μ)</label>
                  <input type="number" className="form-control mt-1" placeholder="Tax Identification Number" required />
                </div>
                <div className="d-grid gap-2 mt-3">
                  <button type="submit" className="btn btn-dark">
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        );
    }
}

export default SignUpComponent;