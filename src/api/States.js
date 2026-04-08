import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

export default function States() {
  const [states, setStates] = useState([]);

  useEffect(() => {
    fetchStates();
  }, []);

  const fetchStates = async () => {
    const { data, error } = await supabase
      .from("states")
      .select("*");

    if (error) console.log(error);
    else setStates(data);
  };

  return (
    <div>
      <h2>Indian States</h2>
      {states.map((s) => (
        <div key={s.id}>
          <h3>{s.name}</h3>
          <p>{s.description}</p>
          <img src={s.image} width="200" />
        </div>
      ))}
    </div>
  );
}