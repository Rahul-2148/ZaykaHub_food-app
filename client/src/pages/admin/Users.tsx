import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { useUserStore } from "@/Zustand Store/useUserStore";
import { toast } from "sonner";
import { User } from "@/Zustand Store/useUserStore";

const Users = () => {
  const { getAllUsers, searchUsers } = useUserStore();
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState<User[]>([]);

  const [loading, setLoading] = useState(true);

  // Fetch all users on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const allUsers = await getAllUsers();
        // console.log("Fetched Users:", allUsers);
        setUsers(Array.isArray(allUsers) ? allUsers : []); 
      } catch (error) {
        console.error("Error fetching users:", error);
        setUsers([]); 
      }
      setLoading(false);
    };
    fetchUsers();
  }, [getAllUsers]);

  // Handle user search
  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearch(query);

    if (query.trim() === "") {
      setLoading(true);
      try {
        const allUsers = await getAllUsers();
        console.log("Fetched Users (After Clearing Search):", allUsers);
        setUsers(Array.isArray(allUsers) ? allUsers : []);
      } catch (error) {
        console.error("Error fetching all users:", error);
        setUsers([]);
      }
      setLoading(false);
    } else {
      try {
        setLoading(true);
        const searchedUsers = await searchUsers(query);
        console.log("Searched Users:", searchedUsers);
        setUsers(
          Array.isArray(searchedUsers) && searchedUsers.length > 0
            ? searchedUsers
            : []
        );
      } catch (error) {
        console.error("Search failed:", error);
        toast.error("Search failed");
        setUsers([]);
      }
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 md:mt-17"
    >
      <Card className="p-4 shadow-lg rounded-xl">
        <h2 className="text-2xl font-bold mb-4">All Users</h2>
        <Input
          type="text"
          placeholder="Search users by name, email, or contact..."
          value={search}
          onChange={handleSearch}
          className="mb-4 w-full p-2 border rounded-lg"
        />
        <div className="overflow-x-auto">
          <Table className="min-w-full border rounded-lg">
            <TableHeader>
              <TableRow>
                <TableHead className="w-1/6">ID</TableHead>
                <TableHead className="w-1/4">Name</TableHead>
                <TableHead className="w-1/4">Email</TableHead>
                <TableHead className="w-1/6">Role</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center p-4">
                    Loading users...
                  </TableCell>
                </TableRow>
              ) : users.length > 0 ? (
                users.map((user, index) => (
                  <TableRow key={user._id || index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{user.fullname}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.admin ? "Admin" : "User"}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center p-4">
                    No users found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </Card>
    </motion.div>
  );
};

export default Users;
