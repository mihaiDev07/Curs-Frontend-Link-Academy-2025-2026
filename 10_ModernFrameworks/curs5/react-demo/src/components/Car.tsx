type CarProps = {
  brand?: string;
  id: number | string; // sau string, după caz
};



export default function Car(props: CarProps) {
  return <li>{props.id} - I am a {props.brand}</li>;
}