import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({onClick, text}) => (
  <button onClick={onClick} >{text}</button>
)

const Statistic = ({stat}) => (
  <tr>
    <td>{stat.name}</td><td>{stat.value} {stat.suffix}</td>
  </tr>
)

const Statistics = ({stats, total}) => (
  <div>
    <h1>statistiikka</h1>
    <table>
      <tbody>
        {total > 0 && stats.map((stat, index) => <Statistic stat={stat} key={index} />)}
      </tbody>
    </table>
    {total === 0 && "Ei yhtään palautetta annettu"}
  </div>
)

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const total = good + neutral + bad;
  const stats = [
    {name: 'hyvä', value: good},
    {name: 'neutraali', value: neutral},
    {name: 'huono', value: bad},
    {name: 'yhteensä', value: total},
    {name: 'keskiarvo', value: Math.round(((good + bad * -1) / total) * 10) / 10 },
    {name: 'positiivisia', value: Math.round((good / total) * 1000) / 10, suffix: '%'}
  ];

  return (
    <div>
      <h1>anna palautetta</h1>
      <Button onClick={() => setGood(good+1)} text='hyvä' />
      <Button onClick={() => setNeutral(neutral+1)} text='neutraali' />
      <Button onClick={() => setBad(bad+1)} text='huono' />
      <Statistics stats={stats} total={total} />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'))