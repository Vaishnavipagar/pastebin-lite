export async function getServerSideProps({ params, req }) {
  const baseUrl = `http://${req.headers.host}`;

  const res = await fetch(
    `${baseUrl}/api/pastes/${params.id}`
  );

  if (!res.ok) {
    return { notFound: true };
  }

  const data = await res.json();
  return { props: { content: data.content } };
}

export default function PasteView({ content }) {
  return (
    <pre style={{ whiteSpace: "pre-wrap" }}>
      {content}
    </pre>
  );
}
