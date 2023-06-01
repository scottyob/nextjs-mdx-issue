import { glob } from "glob";

type Props = {
  params: {slug: string }
}

export default async function Page(props: Props) {

  // Load up the MDX post
  const { default: Component } = await import(
    `content/${props.params.slug}/page.mdx`
  );

  return <Component />

}

export async function generateStaticParams() {
  const regex = /^content\/(.*)\/page\.mdx$/;
  let files = await glob('content/**/page.mdx');
  return files.map((f) => {
    return {
      slug: f.match(regex)?.[1] ?? ''
    }
  });
}
