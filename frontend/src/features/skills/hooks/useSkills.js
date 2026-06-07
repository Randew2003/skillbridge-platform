import { useEffect, useState } from "react";
import { useAuth } from "../../auth/hooks/useAuth";
import {
  createOrUpdateSkills,
  deleteSkillRecord,
  getSkillsByUserId,
  searchBySkill,
} from "../api/skillApi";

export const useSkills = () => {
  const { user } = useAuth();

  const [skillRecord, setSkillRecord] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchUserSkills = async () => {
    if (!user?.id) return;

    setLoading(true);
    setError("");

    try {
      const data = await getSkillsByUserId(user.id);
      setSkillRecord(data);
    } catch (err) {
      if (err.response?.status === 404) {
        setSkillRecord(null);
      } else {
        setError(err.response?.data?.message || "Failed to load skills");
      }
    } finally {
      setLoading(false);
    }
  };

  const saveUserSkills = async (skills) => {
    if (!user?.id) {
      throw new Error("User not found. Please login again.");
    }

    setLoading(true);
    setError("");

    const skillData = {
      userId: user.id,
      type: "USER",
      skills,
    };

    try {
      const data = await createOrUpdateSkills(skillData);
      setSkillRecord(data);
      return data;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save skills");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const searchSkills = async (skill) => {
    if (!skill.trim()) {
      setSearchResults([]);
      return;
    }

    setSearchLoading(true);
    setError("");

    try {
      const data = await searchBySkill(skill);
      setSearchResults(data);
      return data;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to search skills");
      throw err;
    } finally {
      setSearchLoading(false);
    }
  };

  const removeSkillRecord = async () => {
    if (!skillRecord?.id) return;

    setLoading(true);
    setError("");

    try {
      await deleteSkillRecord(skillRecord.id);
      setSkillRecord(null);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete skills");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserSkills();
  }, [user?.id]);

  return {
    skillRecord,
    searchResults,
    loading,
    searchLoading,
    error,
    fetchUserSkills,
    saveUserSkills,
    searchSkills,
    removeSkillRecord,
  };
};