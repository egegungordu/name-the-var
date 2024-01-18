// export const dynamic = "force-dynamic";

export default function GuessingPage({
  params,
}: {
  params: { language: string };
}) {
  const renderedAt = new Date().toISOString();

  return (
    <div className="flex h-full flex-col items-center justify-center">
      <div className="text-3xl font-semibold text-neutral-700">
        Guessing Page
      </div>
      <div className="text-3xl font-semibold text-neutral-700">
        {params.language}
      </div>
      <div className="text-3xl font-semibold text-neutral-700">
        {renderedAt}
      </div>
    </div>
  );
}
