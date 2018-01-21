import Component from "inferno-component";
import "./registerServiceWorker";
// Import modules
import axios from 'axios';
import _ from "lodash";

class App extends Component {
  // eslint-disable-next-line
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      asc: false,
      desc: false
    };
    this.orderAsc = this.orderAsc.bind(this);
    this.orderDesc = this.orderDesc.bind(this);
  }
  componentDidMount() {
    axios.get('https://s3-us-west-2.amazonaws.com/lgoveabucket/data_melp.json')
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
  render() {
    return (
      <div className="App">
        <header>
          <nav class="navbar is-link" aria-label="main navigation">
            <div class="navbar-brand">
              <a class="navbar-item" href="https://bulma.io">
                MELP LOGO
              </a>
              <button class="button navbar-burger">
                <span>as</span>
                <span>sas</span>
                <span>as</span>
              </button>
            </div>
          </nav>
        </header>
        <section class="hero is-light is-medium">
          <div class="hero-body">
            <div class="container">
              <h1 class="title">MELP</h1>
              <h2 class="subtitle">Know best restaurants in the city</h2>
            </div>
          </div>
        </section>
        <section className="container">
          <table class="table is-striped is-hoverable is-fullwidth">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>
                  Rating
                  <div class="control" style="display: inline-block;">
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
              {this.state.data.map(value => {
                return (
                  <tr>
                    <th>{value.id}</th>
                    <th>{value.name}</th>
                    <th>{value.rating}</th>
                    <th>
                      State: {value.address.state} <br/>
                      City: {value.address.city}<br/>
                      Street: {value.address.street}<br/>
                      Location: <br/>
                      Lat: {value.address.location.lat} <br/>
                      Lng: {value.address.location.lng}
                    </th>
                    <th>
                      Site: <a href={value.contact.site}>{value.contact.site}</a> <br/>
                      Email: <a href={`mailto:${value.contact.email}`}>{value.contact.email}</a> <br/>
                      Phone: {value.contact.phone}
                    </th>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </section>
      </div>
    );
  }
}

export default App;
