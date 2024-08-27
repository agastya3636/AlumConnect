import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AlumniDirectory from "./pages/AlumniDirectory";
import Events from "./pages/Events";
import Mentorship from "./pages/Mentorship";
import Login from "./pages/Login";
import Placement from "./pages/Placement";
import Profile from "./pages/Profile";
import DiscussionForums from "./pages/DiscussionForums";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./ui/AppLayout";
import BatchDetails from "./features/alumnidirectory/BatchDetails";
import ProgramDetails from "./features/mentorship/ProgramDetails";
import ForumQuestions from "./features/forums/ForumsQuestions";
import QuestionDiscussion from "./features/forums/QuestionDiscussion";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<Navigate replace to="dashboard" />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="alumnidirectory" element={<AlumniDirectory />} />
          <Route path="/alumnidirectory/:year" element={<BatchDetails />} />
          <Route path="events" element={<Events />} />
          <Route path="mentorship" element={<Mentorship />} />
          <Route path="mentorship/:id" element={<ProgramDetails />} />
          <Route path="placement" element={<Placement />} />
          <Route path="profile" element={<Profile />} />
          <Route path="discussionforums" element={<DiscussionForums />} />
          <Route
            path="/discussionforums/:forumId"
            element={<ForumQuestions />}
          />
          <Route
            path="/discussionforums/:forumId/questions/:questionId"
            element={<QuestionDiscussion />}
          />
        </Route>
        <Route path="login" element={<Login />} />

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
