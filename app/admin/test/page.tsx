"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import useSWR from "swr";
import axios from "axios";
import { useState, useEffect } from "react";

const DEFAULTS = {
  isActive: false,
  questionCount: 30,
  durationMinutes: 60,
  instructionMinutes: 2,
  instructions: `Once you start, you cannot pause the test.
You can skip questions and come back later.
Ensure you have a stable internet connection.`,
};

export default function TestSettingsForm() {
  const {
    data: test,
    // isLoading,
    mutate,
  } = useSWR("/api/admin/test", async () =>
    axios.get("/api/admin/test").then((res) => res.data)
  );

  const [form, setForm] = useState(DEFAULTS);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (test) {
      setForm({
        isActive: test.isActive ?? DEFAULTS.isActive,
        questionCount: test.questionCount ?? DEFAULTS.questionCount,
        durationMinutes: test.durationMinutes ?? DEFAULTS.durationMinutes,
        instructionMinutes:
          test.instructionMinutes ?? DEFAULTS.instructionMinutes,
        instructions: test.instructions ?? DEFAULTS.instructions,
      });
    }
  }, [test]);

  const handleInputChange = (key: string, value: boolean | number | string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleApplyChanges = async () => {
    try {
      setLoading(true);
      const res = await axios.post("/api/admin/test", form);
      toast.success(res.data?.message || "Test settings updated.");
      mutate(); // Revalidate
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong while saving.");
    } finally {
      setLoading(false);
    }
  };

  const handleRestoreDefaults = () => setForm(DEFAULTS);

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow border space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800">Test Settings</h2>

      <div className="flex items-center justify-between">
        <Label className="mb-2">Test Active</Label>
        <Switch
          checked={form.isActive}
          onCheckedChange={(val) => handleInputChange("isActive", val)}
        />
      </div>

      <div>
        <Label className="mb-2">Number of Questions</Label>
        <Input
          type="number"
          min={1}
          value={form.questionCount}
          onChange={(e) =>
            handleInputChange("questionCount", parseInt(e.target.value))
          }
        />
      </div>

      <div>
        <Label className="mb-2">Test Duration (minutes)</Label>
        <Input
          type="number"
          min={1}
          value={form.durationMinutes}
          onChange={(e) =>
            handleInputChange("durationMinutes", parseInt(e.target.value))
          }
        />
      </div>

      <div>
        <Label className="mb-2">Instruction Duration (minutes)</Label>
        <Input
          type="number"
          min={1}
          value={form.instructionMinutes}
          onChange={(e) =>
            handleInputChange("instructionMinutes", parseInt(e.target.value))
          }
        />
      </div>

      <div>
        <Label className="mb-2">Instructions</Label>
        <Textarea
          value={form.instructions}
          onChange={(e) =>
            handleInputChange("instructions", e.target.value.trim())
          }
          rows={5}
        />
      </div>

      <div className="flex justify-end gap-4 pt-4">
        <Button variant="outline" onClick={handleRestoreDefaults}>
          Restore Defaults
        </Button>
        <Button onClick={handleApplyChanges} disabled={loading}>
          {loading ? "Saving..." : "Apply Changes"}
        </Button>
      </div>
    </div>
  );
}
