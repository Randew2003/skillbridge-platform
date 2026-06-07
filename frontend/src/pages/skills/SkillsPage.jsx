import { useState } from "react";
import { Brain, Search, Trash2 } from "lucide-react";

import DashboardLayout from "../../components/layout/DashboardLayout";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import { useSkills } from "../../features/skills/hooks/useSkills";

const SkillsPage = () => {
  const {
    skillRecord,
    searchResults,
    loading,
    searchLoading,
    error,
    saveUserSkills,
    searchSkills,
    removeSkillRecord,
  } = useSkills();

  const [skillsInput, setSkillsInput] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [success, setSuccess] = useState("");
  const [formError, setFormError] = useState("");

  const handleSaveSkills = async (e) => {
    e.preventDefault();
    setSuccess("");
    setFormError("");

    const skills = skillsInput
      .split(",")
      .map((skill) => skill.trim())
      .filter((skill) => skill.length > 0);

    if (skills.length === 0) {
      setFormError("Please enter at least one skill.");
      return;
    }

    try {
      await saveUserSkills(skills);
      setSkillsInput("");
      setSuccess("Skills saved successfully.");
    } catch (err) {
      setFormError(err.response?.data?.message || "Failed to save skills.");
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setSuccess("");
    setFormError("");

    try {
      await searchSkills(searchInput);
    } catch (err) {
      setFormError(err.response?.data?.message || "Failed to search skills.");
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Skills</h1>
          <p className="mt-2 text-slate-500">
            Add your skills and search skill records across the platform.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <div className="mb-6 flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
                <Brain size={24} />
              </div>

              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  My Skills
                </h2>
                <p className="text-sm text-slate-500">
                  Add skills separated by commas.
                </p>
              </div>
            </div>

            <form onSubmit={handleSaveSkills} className="space-y-5">
              <Input
                label="Skills"
                name="skills"
                value={skillsInput}
                onChange={(e) => setSkillsInput(e.target.value)}
                placeholder="Example: React, Spring Boot, PostgreSQL"
                required
              />

              {formError && (
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                  {formError}
                </div>
              )}

              {success && (
                <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
                  {success}
                </div>
              )}

              <Button type="submit" disabled={loading}>
                {loading ? "Saving..." : "Save Skills"}
              </Button>
            </form>

            <div className="mt-6">
              <h3 className="mb-3 text-sm font-semibold text-slate-700">
                Current Skills
              </h3>

              {!skillRecord ? (
                <p className="text-sm text-slate-500">
                  No skills added yet.
                </p>
              ) : (
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {skillRecord.skills?.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-700"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={removeSkillRecord}
                    className="inline-flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-100"
                  >
                    <Trash2 size={17} />
                    Delete Skill Record
                  </button>
                </div>
              )}
            </div>
          </Card>

          <Card>
            <div className="mb-6 flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-600">
                <Search size={24} />
              </div>

              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Search Skills
                </h2>
                <p className="text-sm text-slate-500">
                  Search users or projects by skill.
                </p>
              </div>
            </div>

            <form onSubmit={handleSearch} className="flex gap-3">
              <input
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search React, Java, MongoDB..."
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
              />

              <button
                type="submit"
                disabled={searchLoading}
                className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-600 disabled:opacity-60"
              >
                {searchLoading ? "..." : "Search"}
              </button>
            </form>

            <div className="mt-6 space-y-4">
              {error && (
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                  {error}
                </div>
              )}

              {searchResults.length === 0 ? (
                <p className="text-sm text-slate-500">
                  Search results will appear here.
                </p>
              ) : (
                searchResults.map((record) => (
                  <div
                    key={record.id}
                    className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
                  >
                    <div className="mb-3 flex items-center justify-between">
                      <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-700">
                        {record.type}
                      </span>

                      <span className="text-xs text-slate-500">
                        {record.type === "USER"
                          ? `User ID: ${record.userId}`
                          : `Project ID: ${record.projectId}`}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {record.skills?.map((skill) => (
                        <span
                          key={skill}
                          className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SkillsPage;