import { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import Select from "../../Form/Select";
const Cont = styled.div`
  input[type="radio"] {
    cursor: pointer;
  }
`;
const Billing = ({
  formData,
  setRegion,
  updateForm,
  sameBilling,
  updateBilling,
}) => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [data, setData] = useState([]);
  const [options, setOptions] = useState([]);
  const [regions, setRegions] = useState([]);
  useEffect(() => {}, [formData.country]);

  function updateCountry(value) {
    setRegion(value, "country");
    let states = data.filter((item) => {
      return item.country === value;
    });
    states = [...new Set(states.map((item) => item.subcountry))];
    states.sort();
    setStates((prevStates) => {
      return states;
    });
  }

  function updateState(value) {
    setRegion(value, "state");

    let cities = data.filter((city) => city.subcountry === value);
    cities = cities.map((city) => city.name);
    cities.sort();
    setCities(cities);
  }

  function updateCity(value) {
    setRegion(value, "city");
  }

  function updateRegion(location, name) {
    console.log(name);
    if (name === "country") {
      updateCountry(location, name);
    } else if (name === "state") {
      updateState(location, name);
    } else if (name == "city") {
      updateCity(location, name);
    }
  }
  useEffect(() => {
    axios
      .get(
        "https://pkgstore.datahub.io/core/world-cities/world-cities_json/data/5b3dd46ad10990bca47b04b4739a02ba/world-cities_json.json"
      )
      .then((res) => {
        setData((prevData) => {
          return res.data;
        });
        setRegions((prevData) => {
          return [...new Set(res.data.map((item) => item.country))].sort();
        });
        setOptions((prevData) => {
          return [...new Set(res.data.map((item) => item.country))].sort();
        });
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <Cont>
      <section>
        <h5 className="mar-bottom-32">
          Is your billing info the same as your delivery info?
        </h5>
        <div>
          <label htmlFor="yes">
            <p>Yes</p>
          </label>
          <input
            value="yes"
            type="radio"
            id="yes"
            name="yes"
            onClick={updateBilling}
            checked={sameBilling === true}
          />
        </div>

        <div>
          <label htmlFor="no">
            <p>No</p>
          </label>
          <input
            type="radio"
            value="no"
            id="no"
            name="yes"
            onClick={updateBilling}
            checked={sameBilling === false}
          />
        </div>
      </section>
      <section>
        {!sameBilling && (
          <section>
            <h5 className="mar-bottom-32">Enter Your information</h5>

            <label htmlFor="firstName">
              <h6>First Name</h6>
            </label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              onChange={updateForm}
              value={formData.firstName}
              placeholder="First Name"
            />
            <p></p>

            <h6>Last Name</h6>

            <input
              type="text"
              name="lastName"
              id="lastName"
              onChange={updateForm}
              value={formData.lastName}
              placeholder="Last Name"
            />
            <p></p>

            <label htmlFor="addressOne">
              <h6>Address Line 1</h6>
            </label>
            <input
              type="text"
              name="addressOne"
              id="addressOne"
              onChange={updateForm}
              value={formData.addressOne}
              placeholder="Address Line 1"
            />
            <p></p>

            <label htmlFor="addressTwo">
              <h6>Address Line 2</h6>
            </label>
            <input
              type="text"
              name="addressTwo"
              id="addressTwo"
              onChange={updateForm}
              value={formData.addressTwo}
              placeholder="Address Line 2"
            />
            <p></p>

            <div className="flex">
              <div>
                <label htmlFor="postal">
                  <h6>Postal/Zip Code</h6>
                </label>
                <input
                  type="text"
                  name="postal"
                  id="postal"
                  onChange={updateForm}
                  value={formData.postal}
                  placeholder="Postal/Zip Code"
                />
                <p className="red"></p>
              </div>
              <div>
                <label htmlFor="country">
                  <h6>Country</h6>
                </label>
                <Select
                  title={"Enter Country"}
                  regions={regions}
                  value={formData.country}
                  updateValue={updateRegion}
                  searchPlaceholder="Search"
                  options={options}
                  setOptions={setOptions}
                  name="country"
                />
                <p></p>
              </div>
            </div>

            <div className="flex">
              <div>
                <label htmlFor="state">
                  <h6>State/Province</h6>
                </label>
                <Select
                  title={"Enter State"}
                  regions={states}
                  options={states}
                  setOptions={setStates}
                  value={formData.state}
                  updateValue={updateRegion}
                  name="state"
                />
                <p></p>
              </div>
              <div>
                <label htmlFor="city">
                  <h6>City</h6>
                </label>
                <Select
                  title={"Enter City"}
                  regions={cities}
                  options={cities}
                  setOptions={setCities}
                  value={formData.city}
                  updateValue={updateRegion}
                  name="city"
                />
                <p></p>
              </div>
            </div>
          </section>
        )}
      </section>
    </Cont>
  );
};

export default Billing;
