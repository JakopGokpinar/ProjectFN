import "./Tags.css";

function Tags(props) {

  return (
    <span id="tag" onClick={() => props.setfilter(props.tag.queryKey, '',props.tag.key,'')}>
      {props.tag.value}
    </span>
  );
}

export default Tags;
