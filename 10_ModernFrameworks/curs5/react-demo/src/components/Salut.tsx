import React from 'react'

// interface SalutProps {
//     name: string;
//     curs: string;
// }
 type SalutProps = {
    name: string;
    curs?: string;
  }
export default function Salut(props: SalutProps) {
    const [message, setMessage] = React.useState('');
    const [cursInput, setCursInput] = React.useState(props.curs ?? '');

    const inscrisCurs = (curs: string) => {
        setMessage(`M-am inscris la cursul de ${curs}`);
    }
    if (props.curs) {
        return (
        <div>Salut sunt {props.name} si particip la cursul de {props.curs}</div>
        )
    } else {
        return (
            <>
            <div>Salut sunt {props.name}</div>
            <input
                type="text"
                value={cursInput}
                onChange={(e) => setCursInput(e.target.value)}
                placeholder="Scrie cursul"
            />
            <button onClick={() => inscrisCurs(cursInput)}>Mă înscriu la curs</button>
            <p>{message}</p>
            </>
        )
    }
}



