import { NumberInput } from "@/components";
import { Typography } from "@/components/Typography";
import { useState } from "react";

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

const dimensions = {
  width: { unit: "m" },
  length: { unit: "m" },
  excavationDepth: { unit: "m" },
  fillDepth: { unit: "m" },
} as const;

const groups = {
  excavation: {
    dimensions: ["width", "length", "excavationDepth"],
    unit: "m^3",
    costPerUnit: 50,
  },
  fill: {
    dimensions: ["width", "length", "fillDepth"],
    unit: "m^3",
    costPerUnit: 100,
  },
  stone: {
    dimensions: ["width", "length"],
    unit: "m^2",
    costPerUnit: 20,
  },
} as const;

function multiplyArray(arr: number[]) {
  return arr.reduce((accumulator, currentValue) => accumulator * currentValue, 1);
}
function sumArray(arr: number[]) {
  return arr.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
}

const dimensionKeys = Object.keys(dimensions) as (keyof typeof dimensions)[];

export default function Home() {
  const [formData, setFormData] = useState({
    width: 10,
    length: 10,
    excavationDepth: 0.2,
    fillDepth: 0.3,
  });
  return (
    <Typography>
      {dimensionKeys.map((dimensionName) => (
        <NumberInput
          key={dimensionName}
          label={dimensionName}
          onInput={(x) => setFormData({ ...formData, [dimensionName]: x })}
          value={formData[dimensionName]}
        />
      ))}

      <div className="flex">
        <div className="flex-1">
          <h2>Amounts</h2>

          {Object.entries(groups).map(([groupName, groupData]) => (
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
          {Object.entries(groups).map(([groupName, groupData]) => (
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
          Object.values(groups).map((groupData) =>
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
