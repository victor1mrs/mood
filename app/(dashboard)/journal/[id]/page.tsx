import Editor from "@/components/Editor";
import { EntrType } from "@/utils/types";
import { getUserFromClerkID } from "@/utils/auth";
import { prisma } from "@/utils/db";

interface EntryPageProps {
  params: {
    id: string;
  };
}

const getEntry = async (id: any) => {
  const user = await getUserFromClerkID();
  const entry: EntrType = await prisma.journalEntry.findUnique({
    where: {
      userId_id: {
        userId: user.id,
        id,
      },
    },
  });
  return entry;
}

const EntryPage = async ({ params }: EntryPageProps) => {
  const entry = await getEntry(params.id);
  const analysisData = [
    {name: 'Summary', value: ''},
    {name: 'Subject', value: ''},
    {name: 'Mood', value: ''},
    {name: 'Negative', value: 'false'},
  ]
  return(
    <div className="w-full h-full grid grid-cols-3">
      <div className="col-span-2">
        {entry && <Editor entry={entry} />}
      </div>
      <div className="border-l border-black/10">
         <div className="bg-blue-300 px-6 py-10">
            <h2 className="text-2xl">Analysis</h2>
         </div>
         <div>
            <ul>
              {analysisData.map((item) => (
                <li key={item.name} className="flex items-center justify-between order-t border-b border-black/10 px-2 py-4">
                  <span className="text-lg font-semibold">{item.name}</span>
                  <span>{item.value}</span>
                </li>)
              )}
            </ul>
          </div>
      </div>
    </div>
  );
};

export default EntryPage
