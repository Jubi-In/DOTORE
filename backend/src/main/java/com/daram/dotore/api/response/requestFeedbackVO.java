package com.daram.dotore.api.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.math.BigInteger;
import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
public class requestFeedbackVO {
    int articleno; //feed
    BigInteger tokenId; //feed
    String item_title; //items
    String questioner; //본인의 주소 feed
    String description; //feed
    boolean YN;
    LocalDateTime created_at; //feed
}
