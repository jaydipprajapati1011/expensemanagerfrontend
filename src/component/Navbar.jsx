import React from 'react';
import { Link } from 'react-router-dom';

export const Navbar = ({ selectedLink }) => {
  return (
    <nav
      className="navbar navbar-expand-lg"
      color-on-scroll={500}
    >
      <div className="container-fluid">
        <Link className="navbar-brand" to="/user/dashboard">
          {selectedLink}
        </Link>
        <button
          href=""
          className="navbar-toggler navbar-toggler-right"
          type="button"
          data-toggle="collapse"
          aria-controls="navigation-index"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-bar burger-lines" />
          <span className="navbar-toggler-bar burger-lines" />
          <span className="navbar-toggler-bar burger-lines" />
        </button>
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navigation"
        >
          <ul className="nav navbar-nav mr-auto">
            <li className="nav-item">
              <Link href="#" className="nav-link" data-toggle="dropdown">
                {/* <i className="nc-icon nc-palette" /> */}
                <span className="d-lg-none">Dashboard</span>
              </Link>
            </li>
            
          </ul>
          <ul className="navbar-nav ml-auto">
           
            <li className="nav-item dropdown">
              <a
                className="nav-link pr-0"
                href="#"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <div className="media align-items-center">
                  <span className="avatar avatar-sm">
                    <img alt="Image placeholder" src="https://www.wikiwrimo.org/w/images/Example.jpg"  width={35} height={35} className='rounded-circle'/>
                  </span>
                  <div className="media-body  ml-2  d-none d-lg-block">
                    <span className="mb-0 text-sm  font-weight-bold">
                      John Snow
                    </span>
                  </div>
                </div>
              </a>
              <div className="dropdown-menu dropdown-menu-right">
                {/* <div className="dropdown-header noti-title">
                  <h6 className="text-overflow m-0">Welcome!</h6>
                </div> */}
                <a href="#!" className="dropdown-item">
                  <i className="ni ni-single-02" />
                  <span>My profile</span>
                </a>
                <div className="dropdown-divider" />
                <a href="#!" className="dropdown-item">
                  <i className="ni ni-user-run" />
                  <span>Logout</span>
                </a>
              </div>
            </li>

            {/* <li className="nav-item">
              <a className="nav-link" href="#pablo">
                <span className="no-icon">Log out</span>
              </a>
            </li> */}
          </ul>
        </div>
      </div>
    </nav>
  );
};