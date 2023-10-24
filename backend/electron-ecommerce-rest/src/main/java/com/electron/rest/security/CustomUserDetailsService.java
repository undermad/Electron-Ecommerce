package com.electron.rest.security;

import com.electron.rest.entity.Role;
import com.electron.rest.entity.User;
import com.electron.rest.repository.RoleRepository;
import com.electron.rest.repository.UserRepository;
import org.springframework.http.converter.json.GsonBuilderUtils;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private UserRepository userRepository;

    public CustomUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

        User user = userRepository.getUserByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Not found"));





        Set<GrantedAuthority> authorities = user.getRoles()
                .stream()
                .map((role -> new SimpleGrantedAuthority(role.getRoleName())))
                .collect(Collectors.toSet());


        return new org.springframework.security.core.userdetails
                .User(user.getEmail(), user.getPassword(), authorities);
    }
}
