import { NumberInput, TextInput } from "@/components";
import { Typography } from "@/components/Typography";
import { useState } from "react";
import { z } from "zod";
const schema = z.string();
type x = z.infer<typeof schema>;

const DisplayData = (p: {
  material: string;
  qty: number;
  formula: string;
  leftUnit?: string;
  rightUnit?: string;
}) => {
  return (
    <div className="flex items-baseline gap-4">
      <div className="tooltip" data-tip={p.formula}>
        <button className="btn btn-circle btn-info">i</button>
      </div>
      <p className="text-xl">
        {p.material}: {p.leftUnit}
        {p.qty} {p.rightUnit}
      </p>
    </div>
  );
};

function multiplyArray(arr: number[]) {
  return arr.reduce((accumulator, currentValue) => accumulator * currentValue, 1);
}
function sumArray(arr: number[]) {
  return arr.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
}
type TDimensions = { [key: string]: { unit: string } };

type TDimensionGroups = {
  [key: string]: {
    dimensions: string[];
    unit: string;
    costPerUnit: number;
  };
};

export default function Home() {
  const [newDimension, setNewDimension] = useState("dsa");
  const [newDimensionUnit, setNewDimensionUnit] = useState("m");

  const [formData, setFormData] = useState<{ [key: string]: number }>({
    width: 10,
    length: 10,
  });

  const [dimensions, setDimensions] = useState<TDimensions>({
    width: { unit: "m" },
    length: { unit: "m" },
  });
  const [dimensionGroups, setDimensionGroups] = useState<TDimensionGroups>({
    stone: {
      dimensions: ["width", "length"],
      unit: "m^2",
      costPerUnit: 20,
    },
  });
  const dimensionKeys = Object.keys(dimensions) as (keyof typeof dimensions)[];
  return (
    <Typography>
      <div className="flex gap-4">
        <pre className="flex-1">{JSON.stringify(dimensions, undefined, 2)}</pre>
        <pre className="flex-1">{JSON.stringify(dimensionGroups, undefined, 2)}</pre>
      </div>
      <h2>Add Dimensions</h2>
      <div className="flex items-center gap-4">
        <TextInput label="new dim" onInput={(x) => setNewDimension(x)} value={newDimension} />
        <TextInput
          label="new dim unit"
          onInput={(x) => setNewDimensionUnit(x)}
          value={newDimensionUnit}
        />
        <button
          className="btn btn-primary"
          onClick={() => {
            setDimensions({ ...dimensions, [newDimension]: { unit: newDimensionUnit } });
          }}
        >
          addDimension
        </button>
      </div>

      <h2>Use Dimensions</h2>
      {dimensionKeys.map((dimensionName) => {
        if (dimensionName in formData && formData[dimensionName] !== undefined)
          return (
            <NumberInput
              key={dimensionName}
              label={dimensionName}
              onInput={(x) => setFormData({ ...formData, [dimensionName]: x })}
              value={formData[dimensionName]}
            />
          );
      })}

      <div className="flex">
        <div className="flex-1">
          <h2>Amounts</h2>

          {Object.entries(dimensionGroups).map(([groupName, groupData]) => (
            <DisplayData
              key={`${groupName}-amount`}
              formula={groupData.dimensions.join(" * ")}
              qty={multiplyArray(groupData.dimensions.map((dimension) => formData[dimension]))}
              material={groupName}
              rightUnit={groupData.unit}
            />
          ))}
        </div>

        <div className="flex-1">
          <h2>Costs</h2>
          {Object.entries(dimensionGroups).map(([groupName, groupData]) => (
            <DisplayData
              key={`${groupName}-costs`}
              formula={[...groupData.dimensions, groupData.costPerUnit].join(" * ")}
              qty={multiplyArray([
                ...groupData.dimensions.map((dimension) => formData[dimension]),
                groupData.costPerUnit,
              ])}
              material={groupName}
              leftUnit="£"
            />
          ))}
        </div>
      </div>
      <h2>
        Total: £
        {sumArray(
          Object.values(dimensionGroups).map((groupData) =>
            multiplyArray([
              ...groupData.dimensions.map((dimension) => formData[dimension]),
              groupData.costPerUnit,
            ]),
          ),
        )}
      </h2>
    </Typography>
  );
}
