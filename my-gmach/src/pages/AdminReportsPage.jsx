
import React, { useState } from 'react';
import { Box, Typography, List, ListItem, ListItemText, IconButton, Button, Stack } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import MarkEmailUnreadIcon from '@mui/icons-material/MarkEmailUnread';
import { styled } from '@mui/material/styles';

// צבעים לעיצוב
const COLORS = {
  open: '#FDFEFE', // לבן קרמי לפתוחים
  resolved: '#D5D8DC', // אפור בהיר לסגורים
  textPrimary: '#212F3C',
  textSecondary: '#566573',
  button: '#1A5276', // צבע כפתורים
};

const StyledListItem = styled(ListItem)(({ status }) => ({
  backgroundColor: status === 'open' ? COLORS.open : COLORS.resolved,
  borderBottom: `1px solid ${COLORS.textSecondary}`,
  borderRadius: '8px',
  margin: '10px 0',
  boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
  transition: 'background-color 0.3s',
}));

const reportsMockData = [
  { id: 1, type: 'דיווח על גמ"ח', content: 'המידע על הגמ"ח הזה אינו מעודכן.', status: 'open', read: false },
  { id: 2, type: 'דיווח על תגובה', content: 'תגובה זו מכילה תוכן לא הולם.', status: 'resolved', read: true },
  { id: 3, type: 'דיווח על גמ"ח', content: 'כפילות ברישום גמ"חים.', status: 'open', read: false },
];

export default function AdminReportsPage() {
  const [reports, setReports] = useState(reportsMockData);

  const handleDelete = (id) => {
    setReports(reports.filter((report) => report.id !== id));
  };

  const handleOpen = (id) => {
    alert(`פתיחת פרטי הגמ"ח לדיווח ID: ${id}`);
  };

  const toggleReadStatus = (id) => {
    setReports(
      reports.map((report) =>
        report.id === id ? { ...report, read: !report.read } : report
      )
    );
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" sx={{ marginBottom: 3, color: COLORS.textPrimary, textAlign: 'center', fontWeight: 'bold' }}>
        ניהול דיווחים באתר
      </Typography>

      <List>
        {reports.map((report) => (
          <StyledListItem key={report.id} status={report.status}>
            <ListItemText
              primary={report.type}
              secondary={report.content}
              primaryTypographyProps={{
                color: COLORS.textPrimary,
                fontWeight: 'bold',
              }}
              secondaryTypographyProps={{ color: COLORS.textSecondary }}
            />

            <Stack direction="row" spacing={1}>
              <IconButton
                color="primary"
                onClick={() => toggleReadStatus(report.id)}
              >
                {report.read ? <MarkEmailReadIcon /> : <MarkEmailUnreadIcon />}
              </IconButton>

              <Button
                variant="contained"
                startIcon={<OpenInNewIcon />}
                onClick={() => handleOpen(report.id)}
                sx={{ backgroundColor: COLORS.button, color: '#fff' }}
              >
                פתח
              </Button>

              <IconButton edge="end" color="error" onClick={() => handleDelete(report.id)}>
                <DeleteIcon />
              </IconButton>
            </Stack>
          </StyledListItem>
        ))}
      </List>

      {reports.length === 0 && (
        <Typography variant="h6" color={COLORS.textSecondary} textAlign="center" mt={3}>
          אין דיווחים להצגה.
        </Typography>
      )}
    </Box>
  );
}
