package com.electron.rest.security;

import com.electron.rest.repository.auth.RoleRepository;
import com.electron.rest.repository.auth.UserRepository;
import com.electron.rest.entity.projections.UserProjection;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;

    public CustomUserDetailsService(UserRepository userRepository, RoleRepository roleRepository) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

        List<UserProjection> users = userRepository.findUserEmailAndPassword(email);
        if(users.isEmpty()){
            throw new UsernameNotFoundException("Email or password is incorrect.");
        }
        UserProjection user = users.getFirst();


        Set<GrantedAuthority> authorities = roleRepository.getRolesByUserId(user.getId())
                .stream()
                .map((roleProjection -> new SimpleGrantedAuthority(roleProjection.getRoleName())))
                .collect(Collectors.toSet());


        return new org.springframework.security.core.userdetails
                .User(user.getEmail(), user.getPassword(), authorities);
    }

}
