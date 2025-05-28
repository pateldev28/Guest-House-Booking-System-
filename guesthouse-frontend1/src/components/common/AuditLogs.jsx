import { useEffect, useState } from 'react';
import { fetchAuditLogs } from '../../services/api';

const AuditLogs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAuditLogs()
      .then(data => {
        setLogs(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading audit logs...</div>;

  return (
    <div className="audit-logs">
      <h3>System Audit Logs</h3>
      <div className="logs-container">
        {logs.map(log => (
          <div key={log.id} className="log-entry">
            <div className="log-header">
              <span className="log-action">{log.action}</span>
              <span className="log-timestamp">{log.timestamp}</span>
            </div>
            <div className="log-details">
              <span>User: {log.userName}</span>
              <span>Target: {log.targetType}</span>
              <span>Details: {log.details}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AuditLogs;