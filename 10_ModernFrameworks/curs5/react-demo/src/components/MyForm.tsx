import React, { useState } from 'react'

type MyFormProps = {
    name?: string;
    message?: string;
    email?: string;
    password?: string;
    car?: string;
};
type Inputs = {
  name?: string;
  email?: string;
  password?: string;
  car?: string;
  message?: string;
};
export default function MyForm(props: MyFormProps) {
    const [inputs, setInputs] = useState<Inputs>({});

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setInputs((prevInputs) => ({
            ...prevInputs,
            [name]: value,
        }));
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(inputs);
         setInputs({});
    };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Enter your name:
        <input
          type="text"
          name="name"
          value={inputs.name ?? props.name ?? ""}
          onChange={handleChange}
        />
      </label>
      <label>
        Enter your email:
        <input
          placeholder="introdu adresa ta de email"
          type="email"
          name="email"
          value={inputs.email ?? props.email ?? ""}
          onChange={handleChange}
        />
      </label>
      <label>
        Enter your password:
        <input
          type="password"
          name="password"
          value={inputs.password ?? ""}
          onChange={handleChange}
        />
      </label>
      <label>
        Select your car:
        <select name="car" value={inputs.car ?? ""} onChange={handleChange}>
          <option value="">Alege...</option>
          <option value="Ford">Ford</option>
          <option value="Volvo">Volvo</option>
          <option value="Fiat">Fiat</option>
        </select>
      </label>
      <label>
        <textarea
          name="message"
          value={inputs.message ?? props.message ?? ""}
          onChange={handleChange}
        />
      </label>
      <input type="submit" />
    </form>
  )
}
