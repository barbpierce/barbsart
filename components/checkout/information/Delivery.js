import styled from "styled-components";

const Delivery = ({
  updateForm,
  formData,
  pickup,
  setPickupTrue,
  setPickupFalse,
}) => {
  return (
    <div>
      <section>
        <h5 className="mar-bottom-32">
          How would you like your order to arrive?
        </h5>
        <div
          onClick={setPickupTrue}
          className={
            pickup
              ? "mar-bottom-16 select select-active"
              : "mar-bottom-16 select"
          }
        >
          <h5 className="light">Pickup</h5>
        </div>
        <br />
        <div
          onClick={setPickupFalse}
          className={!pickup ? "select select-active" : "select"}
        >
          <h5 className="light">Deliver</h5>
        </div>
      </section>
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

        <h6>Last Name</h6>

        <input
          type="text"
          name="lastName"
          id="lastName"
          onChange={updateForm}
          value={formData.name}
          placeholder="Last Name"
        />

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

        <div className="flex">
          <div>
            <label htmlFor="postal">
              <h6>Postal Code</h6>
            </label>
            <input
              type="text"
              name="postal"
              id="postal"
              onChange={updateForm}
              value={formData.postal}
              placeholder="Postal Code"
            />
          </div>
          <div>
            <label htmlFor="city">
              <h6>City/Municipality</h6>
            </label>
            <input
              type="text"
              name="city"
              id="city"
              onChange={updateForm}
              value={formData.city}
              placeholder="City/Municipality"
            />
          </div>
        </div>

        <div className="flex">
          <div>
            <label htmlFor="province">
              <h6>State/Province</h6>
            </label>
            <input
              type="text"
              name="province"
              id="province"
              onChange={updateForm}
              value={formData.province}
              placeholder="State/Province"
            />
          </div>
          <div>
            <label htmlFor="country">
              <h6>Country</h6>
            </label>
            <input
              type="text"
              name="country"
              id="country"
              onChange={updateForm}
              value={formData.country}
              placeholder="Country"
            />
          </div>
        </div>
      </section>
      <section>
        <h5 className="mar-bottom-32">What's your contact information?</h5>
        <label htmlFor="email">
          <h6>Email</h6>
        </label>
        <input
          type="text"
          name="email"
          id="email"
          onChange={updateForm}
          value={formData.email}
          placeholder="Email"
        />

        <label htmlFor="phone">
          <h6>Phone Number</h6>
        </label>
        <input
          type="text"
          name="phone"
          id="phone"
          onChange={updateForm}
          value={formData.phone}
          placeholder="Phone Number"
        />
      </section>
    </div>
  );
};

export default Delivery;
