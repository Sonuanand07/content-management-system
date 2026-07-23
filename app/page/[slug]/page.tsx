import PublicPage from '@/components/PublicPage';

export default function PageDisplayPage({ params }: { params: { slug: string } }) {
  return <PublicPage slug={params.slug} />;
}
