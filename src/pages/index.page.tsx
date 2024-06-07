import { NumberInput, TextInput } from "@/components";
import { Typography } from "@/components/Typography";
import { useState } from "react";

const DisplayData = (
  p: { material: string; qty: number; formula: string } & (
    | { leftUnit: string }
    | { rightUnit: string }
  ),
) => {
  return (
    <div className="flex items-baseline gap-4">
      <div className="tooltip" data-tip={p.formula}>
        <button className="btn btn-circle btn-info">i</button>
      </div>
      <p className="text-xl">
        {p.material}: {p.qty} m^3
      </p>
    </div>
  );
};

export default function Home() {
  const [newDimension, setNewDimension] = useState("dsa");
  const [newDimensionUnit, setNewDimensionUnit] = useState("m");

  const [dimensions, setDimensions] = useState<{ [k: string]: { unit: string } }>({
    width: {
      unit: "m",
    },
  });

  const [formData, setFormData] = useState<{ [k in keyof typeof dimensions]: number }>({
    width: 10,
  });

  // const [groups, setGroups] = useState([{ item: "width" }]);
  return (
    <Typography fullPage>
      <h1>Patio Calculator</h1>

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
      {Object.entries(dimensions).map(([name, dimension]) => {
        if (!name) return <></>;
        return (
          <NumberInput
            key={name}
            label={`${name} (${dimension.unit})`}
            onInput={(x) => setFormData({ ...formData, [name]: x })}
            value={formData[name] ?? 0}
          />
        );
      })}

      <pre>{JSON.stringify(dimensions, undefined, 2)}</pre>
      <pre>{JSON.stringify(formData, undefined, 2)}</pre>
      {/*
      

      <NumberInput
        label="length"
        placeholder="placeholder"
        onInput={(x) => setFormData({ ...formData, length: x })}
        value={formData.length}
        error=""
      />
      <NumberInput
        label="excavation depth"
        placeholder="placeholder"
        onInput={(x) => setFormData({ ...formData, excavationDepth: x })}
        value={formData.excavationDepth}
        error=""
      />
      <NumberInput
        label="fill depth"
        placeholder="placeholder"
        onInput={(x) => setFormData({ ...formData, fillDepth: x })}
        value={formData.fillDepth}
        error=""
      />

      <div className="flex">
        <div className="flex-1">
          <h2>Amounts</h2>

          <DisplayData
            formula="formData.width * formData.length * formData.excavationDepth"
            qty={formData.width * formData.length * formData.excavationDepth}
            material="Fill"
            rightUnit="m^3"
          />
          <DisplayData
            formula="formData.width * formData.length * formData.fillDepth"
            qty={formData.width * formData.length * formData.fillDepth}
            material="Fill"
            rightUnit="m^3"
          />
          <DisplayData
            formula="formData.width * formData.length"
            qty={formData.width * formData.length}
            material="Stone"
            rightUnit="m^2"
          />
        </div>

        <div className="flex-1">
          <h2>Costs</h2>
          <DisplayData
            formula="formData.width * formData.length * formData.excavationDepth * 50"
            qty={formData.width * formData.length * formData.excavationDepth * 50}
            material="Excavation"
            leftUnit="£"
          />
          <DisplayData
            formula="formData.width * formData.length * formData.fillDepth * 100"
            qty={formData.width * formData.length * formData.fillDepth * 100}
            material="Fill"
            leftUnit="£"
          />

          <DisplayData
            formula="formData.width * formData.length * 20"
            qty={formData.width * formData.length * 20}
            material="Stone"
            leftUnit="£"
          />
        </div>
      </div>
      <h2>
        Total: £
        {formData.width * formData.length * formData.excavationDepth * 50 +
          formData.width * formData.length * formData.fillDepth * 100 +
          formData.width * formData.length * 20}
      </h2>
     */}
    </Typography>
  );
}
