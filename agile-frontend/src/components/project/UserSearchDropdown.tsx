import { useEffect, useState } from "react";
import { searchUsers } from "../../services/userService";
import { addProjectMember } from "../../services/projectService";
import { ROLES } from "../../constants/roles";

// ✅ Proper User type
interface User {
  _id: string;
  name: string;
  email: string;
  avatar?: string;
}

export default function UserSearchDropdown({
  projectId,
  onAdded,
  existingMembers,
  ownerId,
}: {
  projectId: string;
  onAdded: () => void;
  existingMembers: any[];
  ownerId: string;
}) {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // ❌ FIX: condition was reversed earlier
    if (!query.trim()) {
      setUsers([]);
      setShow(false);
      return;
    }

    const fetchUsers = async () => {
      setLoading(true);
      try {
        const data = await searchUsers(query, projectId);

        // ✅ Filter out owner + existing members
        const filtered = data.filter(
          (u: User) =>
            u._id !== ownerId &&
            !existingMembers?.some((m: any) => m.user._id === u._id)
        );

        setUsers(filtered);
        setShow(true);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    const delay = setTimeout(fetchUsers, 300);
    return () => clearTimeout(delay);
  }, [query, projectId, ownerId, existingMembers]);

  const handleSelect = async (user: User) => {
    try {
      await addProjectMember(projectId, user.email, ROLES.DEVELOPER);
      
      setQuery("");
      setUsers([]);
      setShow(false);
      onAdded();
    } catch (err: any) {
      console.error(err.response?.data || err.message);
    }
  };

  return (
    <div className="relative">
      {/* Input */}
      <input
        type="text"
        placeholder="Search users..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full border px-3 py-2 rounded-md text-sm outline-none"
      />

      {/* Dropdown */}
      {show && (
        <div className="absolute z-20 bg-white border rounded-md mt-1 w-full shadow-md max-h-60 overflow-y-auto">
          
          {loading && (
            <div className="p-2 text-sm text-gray-400">Searching...</div>
          )}

          {!loading && users.length === 0 && (
            <div className="p-2 text-sm text-gray-400">
              No users found
            </div>
          )}

          {users.map((u) => (
            <div
              key={u._id}
              onClick={() => handleSelect(u)}
              className="flex items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer"
            >
              {/* ✅ Avatar FIX */}
              <img
                src={
                  u.avatar ||
                  `https://ui-avatars.com/api/?name=${u.name || "User"}`
                }
                onError={(e) => {
                  e.currentTarget.src = `https://ui-avatars.com/api/?name=${u.name || "User"}`;
                }}
                className="w-6 h-6 rounded-full"
              />

              <div>
                <p className="text-sm font-medium">{u.name}</p>
                <p className="text-xs text-gray-500">{u.email}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}