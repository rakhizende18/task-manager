import { useState } from 'react';
import axios from 'axios';
import { TaskItemType } from '../mocks';

const useAxios = () => {
  const [data, setData] = useState<TaskItemType[] | []>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  const url = 'https://my-json-server.typicode.com/rakhizende18/task-manager/tasks'


  const fetchTasks = async () => {
    setLoading(true);
    try {
      const response = await axios.get(url);
      setLoading(false);
      setData([...response.data])
    } catch (error: any) {
      setLoading(false);
      setError(error);
      throw error;
    }
  };

 
  return {data, loading, error, fetchTasks };
};

export default useAxios;