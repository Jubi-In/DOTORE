package com.daram.dotore.db.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "users")
public class Users {

    @Id
    @Column(name = "address", nullable = false, unique = true)
    @Pattern(regexp = "[a-zA-Z0-9]{1,66}")
    String address;

    @Pattern(regexp = "[a-zA-Z0-9ㄱ-ㅎ가-힣 ]{2,10}")
    @NotNull
    String nickname;

    @Pattern(regexp = "[a-zA-Z0-9ㄱ-ㅎ가-힣 ]{0,100}")
    @NotNull
    String description;

    @NotNull
    int acorn;

    @NotNull
    @Column(name = "profile_img_url")
    String profileImgUrl;

    @Builder
    private Users(String address, String nickname, String description, int acorn,
        String profile_img_url) {
        this.address = address;
        this.nickname = nickname;
        this.description = description;
        this.acorn = acorn;
        this.profileImgUrl = profile_img_url;
    }

    public Users setNickname(String nickname) {
        this.nickname = nickname;
        return this;
    }

    public Users setDescription(String description) {
        this.description = description;
        return this;
    }

    public Users setAcorn(int acorn) {
        this.acorn = acorn;
        return this;
    }

    public Users setProfileImgUrl(String profileImgUrl) {
        this.profileImgUrl = profileImgUrl;
        return this;
    }
}