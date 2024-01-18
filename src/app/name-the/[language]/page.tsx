
export default function GuessingPage({ params }: { params: { language: string } }) {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="text-3xl font-semibold text-neutral-700">Guessing Page</div>
      <div className="text-3xl font-semibold text-neutral-700">{params.language}</div>
    </div>
  );
}
