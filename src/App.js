import Component from "inferno-component";
import "./registerServiceWorker";
// Import modules
import axios from "axios";
import _ from "lodash";
import { ModalContainer, ModalDialog } from "react-modal-dialog";

class App extends Component {
  // eslint-disable-next-line
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      asc: false,
      desc: false,
      alphaa: false,
      alphad: false,
      isShowingModal: false,
      restaurant: "",
      site: ""
    };
    this.orderAsc = this.orderAsc.bind(this);
    this.orderDesc = this.orderDesc.bind(this);
    this.alphaAsc = this.alphaAsc.bind(this);
    this.alphaDesc = this.alphaDesc.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }
  componentDidMount() {
    axios
      .get("https://s3-us-west-2.amazonaws.com/lgoveabucket/data_melp.json")
      .then(response => {
        let data = response.data;
        this.setState({ data: data });
      })
      .catch(error => {
        console.log(error);
      });
  }
  orderAsc() {
    this.setState({
      data: _.orderBy(this.state.data, ["rating"], ["asc"]),
      asc: true
    });
    console.log(this.state.desc);
  }
  orderDesc() {
    this.setState({
      data: _.orderBy(this.state.data, ["rating"], ["desc"]),
      desc: true
    });
    console.log(this.state.asc);
  }
  alphaAsc() {
    this.setState({
      data: _.orderBy(this.state.data, ["name"], ["asc"]),
      alphaa: true
    });
    console.log(this.state.desc);
  }
  alphaDesc() {
    this.setState({
      data: _.orderBy(this.state.data, ["name"], ["desc"]),
      alphad: true
    });
    console.log(this.state.asc);
  }
  handleClick(site, name) {
    let description = `Restaurant: ${name}; visit your website ${site}`;
    this.setState({
      isShowingModal: true,
      restaurant: name,
      site: site
    });
    var metas = document.getElementsByTagName("meta");
    for (var i = 0; i < metas.length; i++) {
      if (metas[i].getAttribute("property") === "og:description") {
        return metas[i].setAttribute("content", description);
      }
    }
  }
  handleClose() {
    this.setState({ isShowingModal: false });
  }

  render() {
    return (
      <div className="App">
        <header>
          <nav className="navbar is-dark" aria-label="main navigation">
            <div className="navbar-brand">
              <a className="navbar-item" href="https://bulma.io">
                MELP LOGO
              </a>
            </div>
          </nav>
        </header>
        <section className="hero is-medium">
          <div className="hero-body">
            <div className="container">
              <h1 className="title">MELP</h1>
              <h2 className="subtitle">Know best restaurants in the city</h2>
            </div>
          </div>
        </section>
        <section className="container">
          <div className="table">
            <table class="table is-striped is-hoverable is-fullwidth">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>
                    <div>Name</div>
                    <div class="control table__rating">
                      <label class="radio">
                        <input
                          type="radio"
                          name="foobar"
                          checked={this.state.alphaa}
                          onClick={this.alphaAsc}
                        />
                        Asc
                      </label>
                      <label class="radio">
                        <input
                          type="radio"
                          name="foobar"
                          checked={this.state.alphad}
                          onClick={this.alphaDesc}
                        />
                        Desc
                      </label>
                    </div>
                  </th>
                  <th>
                    <div>Rating</div>
                    <div class="control table__rating">
                      <label class="radio">
                        <input
                          type="radio"
                          name="foobar"
                          checked={this.state.asc}
                          onClick={this.orderAsc}
                        />
                        Asc
                      </label>
                      <label class="radio">
                        <input
                          type="radio"
                          name="foobar"
                          checked={this.state.desc}
                          onClick={this.orderDesc}
                        />
                        Desc
                      </label>
                    </div>
                  </th>
                  <th>Address</th>
                  <th>Contact</th>
                </tr>
              </thead>
              <tfoot>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Rating</th>
                  <th>Address</th>
                  <th>Contact</th>
                </tr>
              </tfoot>
              <tbody>
                {this.state.data.map((value, idx) => {
                  return (
                    <tr>
                      <th>
                        <div className="table__id">{value.id}</div>
                      </th>
                      <th>{value.name}</th>
                      <th>{value.rating}</th>
                      <th>
                        State:{" "}
                        <span className="table__item">
                          {value.address.state}{" "}
                        </span>
                        <br />
                        City:{" "}
                        <span className="table__item">
                          {value.address.city}
                        </span>
                        <br />
                        Street:{" "}
                        <span className="table__item">
                          {value.address.street}
                        </span>
                        <br />
                        Location: <br />
                        <span className="table__item">
                          Lat: {value.address.location.lat}
                        </span>{" "}
                        <br />
                        <span className="table__item">
                          Lng: {value.address.location.lng}
                        </span>{" "}
                      </th>
                      <th>
                        Site:{" "}
                        <a
                          className="table__item"
                          target="_blank"
                          href={value.contact.site}
                        >
                          {value.contact.site}
                        </a>{" "}
                        <br />
                        Email:{" "}
                        <a
                          className="table__item"
                          href={`mailto:${value.contact.email}`}
                        >
                          {value.contact.email}
                        </a>{" "}
                        <br />
                        Phone:{" "}
                        <span className="table__item">
                          {value.contact.phone}
                        </span>{" "}
                        <br />
                        {
                          <span
                            onClick={e =>
                              this.handleClick(
                                value.contact.site,
                                value.name,
                                e
                              )}
                            className="table__fb"
                          >
                            <i
                              className="fa fa-facebook-square"
                              aria-hidden="true"
                            />
                          </span>
                        }
                      </th>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
        {this.state.isShowingModal ? (
          <ModalContainer onClose={this.handleClose}>
            <ModalDialog onClose={this.handleClose}>
              <h1 className="modal__title">
                Restaurant: {this.state.restaurant}
              </h1>
              <h2>
                Visit your website{" "}
                <a target="_blank" href={this.state.site}>
                  {this.state.site}
                </a>
              </h2>
              <br />
              <div style="text-align:center">
                <iframe
                  src="https://www.facebook.com/plugins/like.php?href=https%3A%2F%2Fjhony-reyes.github.io%2Fmelp%2F&width=143&layout=button&action=like&size=small&show_faces=false&share=true&height=65&appId"
                  width="143"
                  height="25"
                  style="border:none;overflow:hidden"
                  scrolling="no"
                  frameborder="0"
                  allowTransparency="true"
                />
              </div>
            </ModalDialog>
          </ModalContainer>
        ) : null}
      </div>
    );
  }
}

export default App;
