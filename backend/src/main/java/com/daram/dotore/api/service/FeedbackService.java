package com.daram.dotore.api.service;

import com.daram.dotore.api.request.AnswerReq;
import com.daram.dotore.api.request.FeedbackReq;
import com.daram.dotore.api.request.FeedbackUpdateReq;
import com.daram.dotore.api.response.FeedbackDetailRes;
import com.daram.dotore.api.response.FeedbackListRes;
import com.daram.dotore.db.entity.Answer;
import com.daram.dotore.db.entity.Feedback;
import java.math.BigInteger;


import java.util.List;

public interface FeedbackService {

    List<Feedback> getResponseFeedbackList(String address);

    Integer getCount(int articleno);

    FeedbackDetailRes getFeedbackDetail(int articleno);

    FeedbackListRes getFeedbacks(BigInteger tokenId);

    FeedbackListRes getMyFeedbacks(BigInteger tokenId, String address);

    List<Feedback> getRespondentList(String address);

    Feedback saveNewFeedback(FeedbackReq feedbackReq) throws Exception;

    Feedback updateFeedback(FeedbackUpdateReq feedbackUpdateReq);

    Answer saveNewAnswer(AnswerReq answerReq) throws Exception;

    Answer updateAnswer(FeedbackUpdateReq feedbackUpdateReq);
}
