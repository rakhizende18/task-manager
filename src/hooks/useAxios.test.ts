import { renderHook, act } from "@testing-library/react";
import axios from "axios";
import useAxios from "./useAxios";

jest.mock("axios");

describe("useAxios", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const responseData = [
    { id: 1, title: "Task 1", description: "Description 1", status: "pending" },
    {
      id: 2,
      title: "Task 2",
      description: "Description 2",
      status: "in progress",
    },
  ];

  it("fetches tasks successfully", async () => {
    (axios.get as any).mockResolvedValueOnce({ data: responseData });
    const { result } = renderHook(() => useAxios());

    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBe(null);
    expect(result.current.data).toEqual([]);

    await act(async () => {
      await result.current.fetchTasks();
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(null);
    expect(result.current.data).toEqual(responseData);
    expect(axios.get).toHaveBeenCalledWith(
      "https://my-json-server.typicode.com/rakhizende18/task-manager/tasks"
    );
  });

  it("handles error when fetching tasks", async () => {
    const errorMessage = "Error fetching tasks";

    (axios.get as jest.Mock).mockRejectedValueOnce(errorMessage);

    const { result } = renderHook(() => useAxios());

    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBe(null);
    expect(result.current.data).toEqual([]);
    await act(async () => {
      await result.current.fetchTasks();
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(errorMessage);
    expect(result.current.data).toEqual([]);
    expect(axios.get).toHaveBeenCalledWith(
      "https://my-json-server.typicode.com/rakhizende18/task-manager/tasks"
    );
  });
});
