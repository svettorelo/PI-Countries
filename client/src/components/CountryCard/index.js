import './CountryCard.css'
export default function CountryCard(props){
  return (
    <div className="card">
      {/*{props.match.params.id}*/}
      <h3>{props.name?props.name:'country name'}</h3>
      <div>{props.continent? props.continent:'continent'}</div>
      <img src={props.flag} height={120} width={200} alt='flag not found'/>
    </div>
  )
}
