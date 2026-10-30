import { HEADLINE_ACCENTS } from "../../data/headlineAccents";

/**
 * Renders a heading with one phrase in brand red (the last occurrence of the phrase configured for
 * accentKey in src/data/headlineAccents.js). Falls back to plain text when the phrase is absent.
 */
const AccentHeadline = ({ as: Tag = "h1", text = "", accentKey, className = "", style }) => {
  const phrase = HEADLINE_ACCENTS[accentKey];
  const at = phrase ? text.toLowerCase().lastIndexOf(phrase.toLowerCase()) : -1;

  return (
    <Tag className={className} style={style}>
      {at === -1 ? (
        text
      ) : (
        <>
          {text.slice(0, at)}
          <span className="text-brand">{text.slice(at, at + phrase.length)}</span>
          {text.slice(at + phrase.length)}
        </>
      )}
    </Tag>
  );
};

export default AccentHeadline;
