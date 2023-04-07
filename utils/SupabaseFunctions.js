import supabase from "./SupabaseClient";

export const fetchUserExists = async (email) => {
  try {
    const { data, error } = await supabase
      .from("users")
      .select()
      .eq("email", email);
    if (error) throw error;
    if (data.length <= 0) {
      return false;
    }
    return true;
  } catch (error) {
    return false;
  }
};

export const fetchUser = async (email) => {
  try {
    const { data, error } = await supabase
      .from("users")
      .select()
      .eq("email", email);
    if (error) throw error;
    return data;
  } catch (error) {
    return false;
  }
};

export const updateUser = async (
  first_name,
  last_name,
  address_one,
  address_two = "",
  country,
  state,
  city,
  email,
  phone_number = ""
) => {
  try {
    const { data, error } = await supabase
      .from("users")
      .update({
        first_name: first_name,
        last_name: last_name,
        address_one: address_one,
        address_two: address_two,
        country: country,
        state: state,
        city: city,
        email: email,
        phone_number: phone_number,
      })
      .eq("email", email);
    if (error) throw error;
    return true;
  } catch (error) {
    return false;
  }
};

export const createUser = async (
  first_name,
  last_name,
  address_one,
  address_two = "",
  country,
  state,
  city,
  email,
  phone_number = "",
  postal = ""
) => {
  console.log("k");
  try {
    const { data, error } = await supabase.from("users").insert([
      {
        first_name: first_name,
        last_name: last_name,
        address_one: address_one,
        address_two: address_two,
        country: country,
        state: state,
        city: city,
        email: email,
        phone_number: phone_number,
        postal: postal,
      },
    ]);
    if (error) throw error;
    return true;
  } catch (error) {
    console.log(error.message);
    return false;
  }
};

export const createOrder = async (placed, fulfilled, user_id, delivery) => {
  try {
    const { data, error } = await supabase.from("orders").insert({
      placed,
      fulfilled,
      user_id,
      delivery,
    });
    if (error) throw error;
    return true;
  } catch (error) {
    console.log(error.message);
    return false;
  }
};

export const fetchWholeOrder = async (user_id) => {
  try {
    const { data, error } = await supabase
      .from("orders")
      .select("*, items(*)")
      .order("id", { ascending: false })
      .limit(1)
      .eq("user_id", user_id);
    if (error) throw error;
    return data;
  } catch (error) {
    return false;
  }
};

export const fetchOrder = async (user_id) => {
  try {
    const { data, error } = await supabase
      .from("orders")
      .select()
      .order("id", { ascending: false })
      .limit(1)
      .eq("user_id", user_id);
    if (error) throw error;
    return data;
  } catch (error) {
    return false;
  }
};

export const setOrderFulfilled = async (order_id, stripe_id, order_total) => {
  try {
    const { data, error } = await supabase
      .from("orders")
      .update({ fulfilled: true, stripe_id, order_total })
      .eq("id", order_id);
    if (error) throw error;
    return true;
  } catch (error) {
    return false;
  }
};

export const createItem = async (title, price, order_id) => {
  try {
    const { data, error } = await supabase.from("items").insert([
      {
        title,
        price,
        order_id,
      },
    ]);
    if (error) throw error;
    return true;
  } catch (error) {
    return false;
  }
};

export const createItems = async (items, order_id) => {
  try {
    const { data, error } = await Promise.all(
      items.map((item) => {
        return supabase.from("items").insert({
          title: item.title,
          price: item.price,
          order_id,
        });
      })
    );

    if (error) throw error;
    return true;
  } catch (error) {
    return false;
  }
};

export const clearOrder = async (order_id) => {
  try {
    const { data, error } = await supabase
      .from("items")
      .delete()
      .eq("order_id", order_id);
    if (error) throw error;
    return true;
  } catch (error) {
    return false;
  }
};

export const createCommission = async (
  name,
  email,
  phone,
  description,
  files
) => {
  try {
    const { data, error } = await supabase
      .from("commissions")
      .insert({ name, email, phone, description, files });
    if (error) throw error;
  } catch (error) {
    console.log(error.message);
    return false;
  }
};

export const uploadFileToServer = async (filePath, file) => {
  try {
    const { data, error } = await supabase.storage
      .from("files")
      .upload(filePath, file);
    if (error) throw error;
    return true;
  } catch (error) {
    console.log(error.message);
    return false;
  }
};
