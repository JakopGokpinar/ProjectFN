import "./Tags.css";

function Tags(props) {
  return (
    <span id="tag" onClick={() => props.removeTag(props.tag.key,props.tag.queryKey)}>
      {props.tag.value}
    </span>
  );
}

export default Tags;
