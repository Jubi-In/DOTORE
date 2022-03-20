package com.daram.dotore.api.controller;

import com.daram.dotore.api.response.BaseRes;
import com.daram.dotore.api.response.UserRes;
import com.daram.dotore.api.service.UserService;
import com.daram.dotore.db.entity.Users;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin("*")
@Api(value = "마이페이지 API")
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/mypage")
public class MypageController {

    @Autowired
    UserService userService;

    @GetMapping("/{address}")
    @ApiOperation(value = "마이페이지", notes = "마이페이지에서 회원 정보 가져오기")
    @ApiResponses({
        @ApiResponse(code = 200, message = "Success", response = UserRes.class),
        @ApiResponse(code = 404, message = "존재하지 않는 address", response = BaseRes.class),
    })
    public ResponseEntity<UserRes> getUser(@PathVariable String address) {
        Users user = userService.getUserByAddress(address);

        // 존재하지 않은 아이디인 경우 에러
        if (user == null) {
                return ResponseEntity.status(404).body(UserRes.of("존재하지 않는 address",null));
        }
        return ResponseEntity.status(200).body(UserRes.of("Success", user));
    }
}