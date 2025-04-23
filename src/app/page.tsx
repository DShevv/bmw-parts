import Select from "@/components/Select/Select";

export default async function Home() {
  return (
    <>
      <Select
        defaultValue={"Все"}
        options={[
          "По популярности",
          "По цене",
          "По алфавиту",
          "По цене (самая низкая)",
          "По цене (самая высокая)",
        ]}
      />
    </>
  );
}
